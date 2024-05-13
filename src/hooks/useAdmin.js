import { useEffect, useState } from "react";

const useAdmin = uid => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if(uid) {
            fetch(`https://subidha-home-services-server3792.glitch.me/users/admin/${uid}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.isAdmin);
                setIsAdmin(data.isAdmin);
                setIsAdminLoading(false);
            })
        }
    }, [uid]);
    return [isAdmin, isAdminLoading];
}

export default useAdmin;