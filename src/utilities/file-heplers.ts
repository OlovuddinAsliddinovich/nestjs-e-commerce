import * as path from 'path';

export const editFileName = (req: any, file: any, callback: any) => {
  callback(
    null,
    file.fieldname + '-' + Date.now() + path.extname(file.originalname),
  );
};
