
import axios from "axios";

const getAlphabetCounteries = async (alphabet_idx) => {
    const curAlphabet = String.fromCharCode('A'.charCodeAt(0) + alphabet_idx % 26);
    
    return axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        const countries = [];
        response.data.forEach((data) => {
            if (data.name.at(0) === curAlphabet.at(0)) countries.push(data);
        })
        
        console.log("countries=", countries);
        return { countries, alphabet: alphabet_idx % 26 };
    });
}   
export default getAlphabetCounteries;