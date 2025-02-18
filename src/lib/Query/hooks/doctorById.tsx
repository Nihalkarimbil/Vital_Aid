import axiosInstance from "@/utils/axios";


export const fetchDoctorById = async (id: string) => {
    if (!id) throw new Error("Doctor ID is required");
    console.log("id",id);
    
    const response = await axiosInstance.get(`/doctors/getdetail/${id}`);
    console.log("API Response:", response.data);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
        throw new Error("Doctor not found");
    }

    return response.data.data[0]; 
};


