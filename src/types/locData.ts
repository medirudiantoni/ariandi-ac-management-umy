import AcDataType from "./acData";

interface LocType {
  id: number;
  alias?: string;
  name?: string | null;
  building: string;
  floor: string;
  room: string;
  fakultas?: string | null;
  prodi?: string | null;
  AC?: AcDataType[];
}

export default LocType;