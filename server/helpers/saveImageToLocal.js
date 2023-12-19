const fs = require('fs');
const path = require('path');

const saveImageToLocal = async (onlineImageUrl, genre) => {
  const imageResponse = await fetch(onlineImageUrl);
  const arrayBuffer = await imageResponse.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const targetDirectory = path.join(__dirname, '../downloadedImages');
  const imageName = `${genre}${Date.now()}.png`.toLowerCase().replace(' ', '');
  const imagePath = path.join(targetDirectory, imageName);

  // Save the image to the public folder
  fs.writeFileSync(imagePath, imageBuffer);
  console.log(`Image saved to ${imagePath}`);

  // Return the local URL (modify this according to your server setup)
  return `/downloadedImages/${imageName}`;
};

module.exports = saveImageToLocal;
