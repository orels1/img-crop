const sharp = require('sharp');
const fetch = require('node-fetch');
const imgurUploader = require('imgur-uploader');
const idx = require('idx');

/**
* Crops or resizes the image from the provided url
* @param {string} url The url of the image to crop
* @param {integer} width The width of the final image
* @param {integer} height The height of the final image
* @param {string} croppingMethod The cropping algorythm to use, check sharp docs: http://sharp.pixelplumbing.com/en/stable/api-resize/#crop
* @returns {object} An object with imgur url or error
*/
module.exports = async (url, width = null, height = null, croppingMethod = 'gravity.center') => {
  if (!url) return ({ error: 'No url was provided' });
  if (!width && !height) {
    return ({ error: 'You must provide width or height'});
  }
  const cropping = croppingMethod.split('.');
  if (cropping.length < 2) return ({ error: 'Invalid cropping method' });
  if (
    !idx(sharp, _ => _[cropping[0]]) ||
    (!idx(sharp, _ => _[cropping[0]][cropping[1]]) && idx(sharp, _ => _[cropping[0]][cropping[1]]) !== 0)
  ) return ({ error: 'Invalid cropping method' });
  
  const decodedUrl = decodeURIComponent(url);
  const resp = await fetch(decodedUrl);
  const image = await resp.arrayBuffer();
  const cropped = await sharp(new Buffer(image))
    .resize(width, height)
    .crop(sharp[cropping[0]][cropping[1]])
    .toBuffer();
  const uploaded = await imgurUploader(cropped, { token: `Client-ID ${process.env.IMGUR_ID}` });
  return ({ result: uploaded.link });
};
