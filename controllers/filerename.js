const fs = require("fs");
const path = require("path");

// Specify the folder path where the images are located
const folderPath = "./public/img/uploads";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Filter out only image files (you can customize this regex as needed)
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  // Rename the image files
  imageFiles.forEach((file, index) => {
    const oldPath = path.join(folderPath, file);
    const extension = path.extname(file);
    const newName = `image${index + 1}${extension}`;
    const newPath = path.join(folderPath, newName);

    fs.rename(oldPath, newPath, (renameErr) => {
      if (renameErr) {
        console.error(`Error renaming ${file}:`, renameErr);
      } else {
        console.log(`Renamed ${file} to ${newName}`);
      }
    });
  });
});
