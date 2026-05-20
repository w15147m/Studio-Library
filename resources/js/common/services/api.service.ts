import axios from "axios";
import Swal from "sweetalert2";
import { funcGen } from "@/common/utilities/generalFunction";

// Placeholder for toast if needed
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export const getHeader = function () {
    const tokenData = localStorage.getItem("accessToken");
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + tokenData,
    };

    return headers;
};

export function handleError(e) {
    let code = parseInt(e.response && e.response.status);

    if (code === 401 || code === 403) {
        // Potentially handle logout or redirect here
        console.warn("Unauthorized or session expired.");
    }
    else if (code === 422) {
        // Handle Laravel Validation Errors
        const errorData = e.response?.data?.errors;
        let combinedMessage = e.response?.data?.message || "Validation Error";
        
        if (errorData) {
            combinedMessage = Object.values(errorData).flat().join('\n');
        }
        
        toast.fire({
            icon: "error",
            title: "Validation Error",
            text: combinedMessage,
            timer: 4000
        });
    }
    else if (code === 451 && e.response?.data?.resource === "access-denied") {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: e.response?.data?.message || "You do not have permission to access this resource",
            timer: 3000
        });
    }
    else if (code >= 500) {
        toast.fire({
            icon: "error",
            title: "Server Error",
            text: "Something went wrong on the server.",
            timer: 3000
        });
    }
}

const funcApi = {
    async fetchData(url, params = {}) {
        try {
            const response = await axios.get(url, {
                headers: getHeader(),
                params: params
            });
            return response.data;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },
    async post(url, data, customConfig = {}) {
        try {
            const response = await axios.post(url, data, {
                ...customConfig,
                headers: { ...getHeader(), ...(customConfig.headers || {}) },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },
    async put(url, data) {
        try {
            const response = await axios.put(url, data, {
                headers: getHeader(),
            });
            return response.data;
        } catch (error) {
            console.error(error);
            handleError(error);
            throw error;
        }
    },
    async destroy(url) {
        return axios
            .delete(url, { headers: getHeader() })
            .then((response) => {
                toast.fire({
                    icon: "success",
                    timer: 3000,
                    title: "Deleted Successfully",
                });
                return response.data;
            })
            .catch((error) => {
                toast.fire({
                    icon: "error",
                    timer: 3000,
                    title: "Something Went Wrong",
                });
                throw error;
            });
    },

    storeObject(variable, obj) {
        localStorage.setItem(variable, JSON.stringify(obj));
        return JSON.parse(localStorage.getItem(variable));
    },
    getStoredObject(variable) {
        if (variable) {
            const item = localStorage.getItem(variable);
            try {
                return item ? JSON.parse(item) : null;
            } catch (e) {
                return null;
            }
        }
        return null;
    },
    storeString(variable, string) {
        localStorage.setItem(variable, string);
        return localStorage.getItem(variable);
    },
    getStoredString(variable) {
        return localStorage.getItem(variable);
    },
    clearStoredString() {
        localStorage.clear();
    },
};

export { funcApi };

// Maintain backward compatibility for now if needed, but the user requested "as it"
export const apiService = funcApi;
export default funcApi;
