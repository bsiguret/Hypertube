const express = require('express');
const router = express.Router();
const mydb = require('../../db/db');
const sql = require('../../db/requetes');
const passport = require('../../tools/passport');

const yifysubtitles = require('yifysubtitles');//
var http = require('http');//
var fs = require('fs');//
var url = require('url');//
var path = require('path');//

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;//
const ffmpeg = require('fluent-ffmpeg');//
ffmpeg.setFfmpegPath(ffmpegPath);//

var torrentStream = require('torrent-stream');//

var engine;
var command = {};

const ft_slicing = (path, to, id) =>
{
  console.log('slicing parame: ', path, to);
  command[id] = ffmpeg(path, {timeout: 432000})
  .addOptions([
    '-f hls',
    '-deadline realtime',
    '-preset ultrafast', // ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo
    '-start_number 0',// start the first .ts segment at index 0
    '-hls_time 10',// 10 second segment duration
    '-hls_list_size 0',
  ])
  .output(to)
  .on('progress', function(progress)
  {
    console.log('progress', path);
  })
  .on('end', () => 
  {
    console.log('slicing completed ', path);
  });
}

function ft_url_mkdir(url)
{
  var tab_url = url.split('/');
  var str_url = '';
  var i = 0;
  while (i < tab_url.length)
  {
    str_url += tab_url[i];
    if (tab_url[i] != '.' && tab_url[i] != ".." && !(fs.existsSync(str_url)))
      fs.mkdirSync(str_url);
    str_url += '/';
    i++;
  }
}

function ft_one_subtitle(movie_id, subtitle_path, lang)
{
  yifysubtitles(movie_id, {path: subtitle_path, langs: lang}).then(res =>
    {
      if (res.length != 0 && res[0].path != '')
      {
        var tmp_path = res[0].path.split("../client/public").join("");
        let data = [movie_id, res[0].lang, tmp_path];
        mydb.connection_db.query(sql.add_movie_subtitle, [[data]], function(err2, rows)
        {
          if (err2) {console.log(err2)}
        });
      }
    })
    .catch(err => console.log(err));
}

function ft_subtitle(id)
{
  var subtitle_path = '../client/public/tmp/subtitles/' + id;
  ft_url_mkdir(subtitle_path);

  mydb.connection_db.query(sql.get_movie_subtitle, [[id]], function(err, rows)
  {
    if (err) {console.log(err); return;}
    console.log('get subtitle rows length :', rows.length);
    if (rows.length == 0)
    {
      console.log('download subtitle ----------------------- ');
      var tab_lang = ['sq','ar','bn','pb','bg','zh','hr','cs','da','nl','en','et','fa','fi','fr','de','el','he','hu','id','it','ja','ko','lt','mk','ms','no','pl','pt','ro','ru','sr','sl','es','sv','th','tr','ur','uk','vi'];
      let i = 0;
      while (i < tab_lang.length)
      {
        ft_one_subtitle(id, subtitle_path, [tab_lang[i]]);
        i++;
      }
    }
  });
};

function ft_engine (id)
{
  let status = 0;

  engine.on('ready', function()
  {
    console.log('engine ready ---------------');
    if (command[id])
    {
      command[id].kill('SIGCONT');
    }
    engine.files.forEach(function(file)
    {
      var tmp_tab = file.name.split('.');
      var format = tmp_tab[tmp_tab.length - 1];
      if (format == 'mp4' || format == 'mkv')
      {
        movie_path = './tmp/' + id + '/' + file.path;
        console.log('movie_path: ', movie_path);
        file.createReadStream({start: 0, end: 15});
        file.createReadStream({start: 16});
      }
    });
  });

  engine.on('download', (pieceindex) =>
  {
    console.log('download', movie_path);
    if (pieceindex <= 15)
    {
      status = status + Math.pow(2, pieceindex);
      console.log('status:', status, pieceindex);
      if (status === 0b1111111111111111)
      {
        fs.access(movie_path, (err) =>
        {
          if (err == null)
          {
            console.log('slicing -------------------');
            var out = './tmp/' + id + '/out.m3u8';
            ft_slicing(movie_path, out, id);
            command[id].run();
          }
        });
      }
    }
  });

  engine.on('idle', () =>
  {
    console.log('downloaded completed', movie_path);
  });
}

function ft_magnet(url)
{
  var is_magnet = url.indexOf('magnet');
  if (is_magnet == -1)
  {
    var hash_url = url.split('/');
    var hash = hash_url[hash_url.length - 1];
    var magnet = 'magnet:?xt=urn:btih:' + hash;
    return (magnet);
  }
  return (url);
}

router.get('/:id/:qualite', passport.authenticate('jwt', {session: false}), (req, res) =>
{
  var id = req.params.id;
  var qualite = req.params.qualite;
  mydb.connection_db.query(sql.get_movie_torrent, [id, qualite], function(err, rows)
  {
    if (err) {console.log(err); return;}
    ft_subtitle(id);
    var magnet = ft_magnet(rows[0].url);

    const options =
    {
      connections: 20,
      uploads: 10,
      tmp: './tmp/',
      path: './tmp/' + id,
      verif: true,
      dht: true,
      tracker: true
    }

    engine = torrentStream(magnet, options);
    ft_engine(id);
    res.send("OK");
    // res.render('./pages/play',
    // {
    //   movies: rows
    // });
  });
});

function ft_objlen(obj)
{
  var len = 0;
  for (i in obj)
  {
    len++;
  }
  return (len);
}

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>
{
  var id = req.body.id;
  console.log(req.body.action);

  if (req.body.action === 'get_movie')
  {
    if (fs.existsSync(__dirname + '/../../tmp/' + req.body.id + '/out.m3u8')) 
    {
      res.send('./tmp/' + req.body.id + '/out.m3u8');
    }
    else
    {
      res.send("NO");
    }
  }

  if (req.body.action === 'get_subtitle')
  {
    mydb.connection_db.query(sql.get_movie_subtitle, [[req.body.id]], function(err, rows)
    {
      if (err)
      {
        console.log(err);
        res.send('NO');
        return ;
      }
      console.log('subtitle in db: ', rows.length);
      res.send(rows);
    });
  }

  // if (req.body['action'] == 'index')
  // {
  //   if (command[id])
  //     command[id].kill('SIGSTOP');
  //   res.send('OK');
  // }

  // if (req.body['action'] == 'engine')
  // {
  //   engine.destroy();
  // }

  if (req.body.action === 'sigstop')
  {
    command[id].kill('SIGSTOP');
    res.send('OK');
  }

  if (req.body.action === 'sigcont')
  {
    command[id].kill('SIGCONT');
    res.send('OK');
  }

  if (req.body.action === 'sigall')
  {
    if (command)
    {

      console.log('obj len: ', ft_objlen(command));
      for (i in command)
      {
        console.log(i);
        command[i].kill('SIGSTOP');
      }
    }
    res.send('OK');
  }
});

module.exports = router;