const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const uuid = require('uuid').v1;

const mkDir = promisify(fs.mkdir);

const { ConstElements: { user, staticDir } } = require('../consts');

module.exports = {
  photoBilder: async (typeDir, nameFile, objectId) => {

    const pathDir = path.join(user, objectId.toString(), typeDir);

    const pathDirFull = path.join(process.cwd(), staticDir, pathDir);


    const pathDirCom = path.join(pathDirFull, nameFile);

    await mkDir(pathDirFull, { recursive: true });

    return pathDirCom;
  },
  photosRenamer: (someName) => {
    const typeFile = someName.name.split('.').pop();
    const newPhoto = path.join(`${uuid()}.${typeFile}`);

    return newPhoto;
  }
};
