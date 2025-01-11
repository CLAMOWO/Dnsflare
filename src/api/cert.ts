import { useAxios } from '@/utils/requests'
import { objectToCamelCase, objectToHungarian } from '@/utils/case'
import { APIResponse } from '.'


export type CertificateAuthority = 'google' | 'lets_encrypt'| 'ssl_com'

export const CertificateAuthorityDisplay : Record<CertificateAuthority, string> = {
    google: 'Google',
    lets_encrypt: 'Let\'s Encrypt',
    ssl_com: 'ssl.com',
}

export type CloudflareCertInfo = {
    certificateAuthority: CertificateAuthority
}

export async function getCertInfo(zoneId: string): Promise<APIResponse<CloudflareCertInfo>> {
    const axios = useAxios()

    try {
        const response = await axios.request<any>({
            url: `/zones/${zoneId}/ssl/universal/settings`,
            method: 'get',
        })

        return (objectToCamelCase(response.data) as any)
    } catch (err) {
        return (objectToCamelCase(err.response.data) as any)
    }
}

export async function patchCertAuthority(zoneId: string, authority: CertificateAuthority): Promise<APIResponse<any>> {
    const axios = useAxios()
    try {

        const response = await axios.request<any>({
            url: `/zones/${zoneId}/ssl/universal/settings`,
            method: 'patch',
            data: objectToHungarian({
                certificateAuthority: authority,
            })
        })

        return (objectToCamelCase(response.data) as any)
    } catch (err) {
        return (objectToCamelCase(err.response.data) as any)
    }
}
