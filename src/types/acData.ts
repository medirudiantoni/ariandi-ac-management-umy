import LocType from "./locData";

interface AcDataType {
  id: number;
  unit_code: string;
  brand: string;
  type: string;
  PK: string;
  condition: boolean;
  is_broken: boolean;
  status: string;
  loc_id: number;
  loc: LocType;
  installed_at: string;
}

// export interface MaintenanceData {
//   id: number;
//   acId: number;
//   AC: AcDataType;
//   coordinator: string;
//   cost: number;
//   description: string;
//   end_date: string; // Gunakan Date jika Anda memparsing string ini menjadi objek Date
//   maintenance_type: string;
//   repair_details: string;
//   replacement_details: string;
//   start_date: string; // Gunakan Date jika Anda memparsing string ini menjadi objek Date
//   status: string;
//   technician: string;
// }

export default AcDataType;