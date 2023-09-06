export default class APIService{
    // Posting data to backend API
    static fetch_api(body){
        return fetch("/activity",{
            'method':'POST',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}