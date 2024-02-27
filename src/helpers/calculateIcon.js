const calculateIcon = (user, stat) => {
        let icon = "../../../assets/Icon_attack_v1.png"

        switch (user.rol){
            case "acolyte":
                if(stat === "intelligence")
                    icon = "https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/icons%2FMagicIcon2.png?alt=media&token=12bbdaaf-cc33-4e40-b268-e8b4c4e5fdc9"
                else
                    icon = "https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/icons%2FswordSlashIcon.png?alt=media&token=fa8a0688-2a9b-4e4b-b973-710c8a93360e"
                break;
            case "knight":
                icon = "https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/icons%2FswordSlashIcon.png?alt=media&token=fa8a0688-2a9b-4e4b-b973-710c8a93360e"
                break;
            default:
                icon = "https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/icons%2FPotionIcon.png?alt=media&token=33cec3be-fdb8-44b7-b8c5-bb8134253f45"
                
        }

        return icon
}

export default calculateIcon;