const config = require('./config')
const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`

class CloudinaryService{
    
    async upload(image) {
        const params = await this.getParams();
        const data = new FormData();
        data.append('file', image);
        data.append('api_key', config.apiKey);
        data.append('timestamp', params.timestamp);
        data.append('signature', params.key)
        const response = await fetch(url, 
            {
                method: 'POST',
                body: data
            })
        return await response.json();
    }

    async getParams() {
        const response = await fetch('/api/cloudinary', {
            method: 'POST'
        })
        return await response.json()
    }
}

export default new CloudinaryService();