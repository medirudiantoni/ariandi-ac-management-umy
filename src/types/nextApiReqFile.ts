import { NextApiRequest } from "next";
import { MulterFile } from "@/lib/multer";
interface NextApiRequestWithFile extends NextApiRequest {
  file?: MulterFile;
  files?: MulterFile[];
};
export default NextApiRequestWithFile;