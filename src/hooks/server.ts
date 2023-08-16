import { api } from "@/lib/api";
import { useQuery } from "react-query";

export function GetUfs() {
    return (
        useQuery(
            ['ufs'],
            async () => {
                const response = await api.get('/regions/ufs')
                return response.data
            }
        )
    )
}
export function GetCities(ufId: string) {
    return (
        useQuery(
            ['cities', ufId],
            async () => {
                const response = await api.get('/regions/cities', {
                    params: {
                        ufId
                    }
                })
                return response.data
            }
        )
    )
}

export function GetCompanies(cityId: string) {
    return (
        useQuery(
            ['companies', cityId],
            async () => {
                const response = await api.get('/regions/companies', {
                    params: {
                        cityId
                    }
                })
                return response.data
            }
        )
    )
}