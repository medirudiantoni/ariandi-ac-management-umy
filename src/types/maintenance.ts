import AcDataType from "./acData";

interface MaintenanceData {
  id: number;
  acId: number;
  AC: AcDataType;
  coordinator: string;
  cost: number;
  description: string;
  end_date: string;
  maintenance_type: string;
  repair_details: string;
  replacement_details: string;
  start_date: string;
  status: string;
  technician: string;
}

export default MaintenanceData;
