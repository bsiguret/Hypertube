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

const ft_slicing = (path, to) =>
{
  console.log('slicing parame: ', path, to);
  var command = ffmpeg(path, {timeout: 432000}).addOptions([
    '-f hls',
    '-deadline realtime',
    // '-preset ultrafast',
    '-start_number 0',// start the first .ts segment at index 0
    '-hls_time 10',// 10 second segment duration
    '-hls_list_size 0',
  ]).output(to).on('end', () => 
  {
    console.log('slicing completed ---------------')
  }).run()
}

function ft_subtitle(id)
{
  if (!(fs.existsSync('./tmp')))
    fs.mkdirSync('./tmp');
  if (!(fs.existsSync('./tmp/' + id)))
    fs.mkdirSync('./tmp/' + id);
  var subtitle_path = './tmp/' + id + '/subtitle';
  if (!(fs.existsSync(subtitle_path)))
    fs.mkdirSync(subtitle_path);
  
  mydb.connection_db.query(sql.get_movie_subtitle, [[id]], function(err, rows)
  {
    if (err)
    {
      console.log(err);
      return ;
    }
    console.log('get subtitle rows length :', rows.length);
    if (rows.length == 0)
    {
      console.log('download subtitle ----------------------- ');
      var tab_lang = ['sq','ar','bn','pb','bg','zh','hr','cs','da','nl','en','et','fa','fi','fr','de','el','he','hu','id','it','ja','ko','lt','mk','ms','no','pl','pt','ro','ru','sr','sl','es','sv','th','tr','ur','uk','vi'];
      // console.log(tab_lang.length);
      let i = 0;
      while (i < tab_lang.length)
      {
        yifysubtitles(id, {path: subtitle_path, langs: [tab_lang[i]]}).then(res =>
        {
          if (res.length != 0 && res[0].path != '')
          {
            let data = [id, res[0].lang, "http://localhost:3000/" + res[0].path];
            mydb.connection_db.query(sql.add_movie_subtitle, [[data]], function(err2, rows)
            {
              if (err2)
                console.log(err2);
            });
          }
        })
        .catch(err => console.log(err));
        i++;
      }
    }
  });
};

const ft_download = (magnet, id) =>
{
  // ft_subtitle(id);
  let status = 0;

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
  engine.on('ready', () =>
  {
    console.log('engine ready ---------------');
    // ft_subtitle(id);
    engine.files.forEach(function(file)
    {
      // console.log('each');
      var tmp_tab = file.name.split('.');
      var format = tmp_tab[tmp_tab.length - 1];
      if (format == 'mp4' || format == 'mkv')
      {
        movie_path = './tmp/' + id + '/' + file.path;

        file.createReadStream({start: 0, end: 15});
        file.createReadStream({start: 16, end: file.length});
      }
    });
  });

  engine.on('download', (pieceindex, d) =>
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
            ft_slicing(movie_path, out);
          }
        });
      }
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
    console.log(magnet);
    ft_download(magnet, id);
    res.render('./pages/play',
    {
      movies: rows
    });
  });
});

router.post('/', (req, res) =>
{
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
      console.log('rows.length: ', rows.length);
      res.send(rows);
    });
  }

  if (req.body['action'] == 'index')
  {
    engine.destroy();
  }
});

module.exports = router;