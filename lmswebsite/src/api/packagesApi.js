import api from "./axiosConfig";

export const createPackage = async (responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.post("/packages/createPackage", responseData);
        console.log("Package created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating package:", error.response?.data || error.message);
    }
};


export const getPackageById = async (classId) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get(`/packages/getPackages${classId}`);
        console.log("Package fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching package:", error.response?.data || error.message);
    }
}


export const getAllPackages = async () => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.get("/packages/getAllPackages");
        console.log("Packages fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching packages:", error.response?.data || error.message);
    }
}

export const deletePackageById = async (packageId) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.delete(`/packages/packages/${packageId}`);
        console.log("Package deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting package:", error.response?.data || error.message);
    }
}


export const updatePackageById = async (packageId, responseData) => {
    try {
        // Call the backend API using the Axios instance
        const response = await api.put(`/packages/updatePackages/${packageId}`, responseData);
        console.log("Package updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating package:", error.response?.data || error.message);
    }
}