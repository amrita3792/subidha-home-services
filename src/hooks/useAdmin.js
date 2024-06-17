import { useEffect, useState } from "react";

const useAdmin = uid => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    // if(!uid) {
    //     return [isAdmin, false];
    // }
    useEffect(() => {
        if(uid) {
            fetch(`https://subidha-home-services-server3792.glitch.me/users/admin/${uid}`)
            .then(res => res.json())
            .then(data => {
     
                setIsAdmin(data.isAdmin);
                setIsAdminLoading(false);
            }).catch(error => {
                setIsAdminLoading(false);
            })
        }
    }, [uid]);
    return [isAdmin, isAdminLoading];
}

export default useAdmin;