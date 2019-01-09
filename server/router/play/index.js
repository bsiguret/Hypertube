const express = require('express');
const router = express.Router();
const mydb = require('../../db/db');
const sql = require('../../db/requetes');

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
var command = new Array();

const ft_slicing = (path, to, id) =>
{
  console.log('slicing parame: ', path, to);
  command[id] = ffmpeg(path, {timeout: 432000})
  .addOptions([
    '-f hls',
    // '-deadline realtime',
    '-preset ultrafast',
    // '-start_number 0',// start the first .ts segment at index 0
    '-hls_time 2',// 10 second segment duration
    '-hls_list_size 0',
  ])
  .output(to)
  .on('progress', function(progress)
  {
    console.log('progress: ', path);
  })
  .on('end', () => 
  {
    console.log('slicing completed ---------------')
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
        let data = [movie_id, res[0].lang, "http://localhost:3000/" + res[0].path];
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
  var subtitle_path = './tmp/' + id + '/subtitle';
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
    engine.files.forEach(function(file)
    {
      var tmp_tab = file.name.split('.');
      var format = tmp_tab[tmp_tab.length - 1];
      if (format == 'mp4' || format == 'mkv')
      {
        movie_path = './tmp/' + id + '/' + file.path;
        console.log('movie_path: ', movie_path);
        file.createReadStream();
      }
    });
    if (fs.existsSync(movie_path))
    {
      console.log('YESSSSSSSSSSSSSSSSSSS movie path exist !!!!!!!!!!!!!!!!!!!!!!!1');
      let out = './tmp/' + id + '/out.m3u8';
      if (fs.existsSync(out))
      {
        status = -1;
      }
    }
    else
    {
      console.log('NOOOOOOOOOOOOOOOOOOOOOOOOO movie path !!!!!!!!!!!!!!!!!!!!!!!1');
    }
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
    else if (status == -1)
    {
      command[id].kill('SIGCONT');
    }
  });

  engine.on('idle', () =>
  {
    console.log('downloaded completed');
  });
}

router.get('/', (req, res) =>
{
  // var id = res.req._parsedUrl.query;
  var id = req.query.id;
  console.log(id);
  // ft_subtitle(id);
  mydb.connection_db.query(sql.get_movie_torrent, [[id]], function(err, rows)
  {
    if (err)
    {
      console.log(err);
      return ;
    }
    ft_subtitle(id);
    console.log(rows[0].url);
    var is_magnet = rows[0].url.indexOf('magnet');
    if (is_magnet == -1)
    {
      var hash_url = rows[0].url.split('/');
      var hash = hash_url[hash_url.length - 1];
      var magnet = 'magnet:?xt=urn:btih:' + hash;
    }
    else
    {
      var magnet = rows[0].url;
    }
    
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

    console.log(magnet);
    engine = torrentStream(magnet, options);
    ft_engine(id);

    res.render('./pages/play',
    {
      movies: rows
    });
  });
});

router.post('/', (req, res) =>
{
  var id = req.body.id;
  console.log(req.body['action']);
  if (req.body['action'] == 'get_movie')
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

  if (req.body['action'] == 'get_subtitle')
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

  if (req.body['action'] == 'index')
  {
    engine.destroy();
    command[id].kill('SIGSTOP');
    res.send('OK');
  }

  if (req.body['action'] == 'engine')
  {
    engine.destroy();
  }

  if (req.body['action'] == 'sigstop')
  {
    command[id].kill('SIGSTOP');
  }

  if (req.body['action'] == 'sigcont')
  {
    command[id].kill('SIGCONT');
  }
});

module.exports = router;