export const fileUpload = async (file)=>{

    if( !file ) throw new Error('No se encontró ningún archivo!')

    const couldUrl = 'https://api.cloudinary.com/v1_1/dr9ay5pcf/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try{
        const resp = await fetch(couldUrl, {
            method: 'POST',
            body: formData
        });


        if(!resp.ok) throw new Error('No se pudo subir la imagen');
        
        const cloudResp = await resp.json();
        console.log(cloudResp);

        return cloudResp.secure_url;

    }catch(error){
        console.log(error);
        throw new Error(error.message);
    }

}