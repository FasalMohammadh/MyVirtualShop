import React from "react";

let locationsArr = [
    "Akkarepattu",
    "Akurana",
    "Akuressa",
    "Ambalangoda",
    "Ambalantota",
    "Ampara",
    "Anuradhapura",
    "Baddegama",
    "Badulla",
    "Balangoda",
    "Bandaragama",
    "Bandarawela",
    "Batticaloa",
    "Beliatta",
    "Bibile",
    "Buttala",
    "Chavakachcheri",
    "Chilaw",
    "Colombo",
    "Dambulla",
    "Dankotuwa",
    "Dehiwala",
    "Dikwella",
    "Eheliyagoda",
    "Elpitiya",
    "Embilipitiya",
    "Eppawala",
    "Galewela",
    "Galle",
    "Gampaha",
    "Gampola",
    "Ginigathhena",
    "Hakmana",
    "Hambantota",
    "Hatton",
    "Hikkaduwa",
    "Hingurakgoda",
    "Horana",
    "Jaffna",
    "Kadawatha",
    "Kaduruwela",
    "Kalmunai",
    "Kalutara",
    "Kandy",
    "Kataragama",
    "Katugastota",
    "Kegalle",
    "Kekirawa",
    "Kilinochchi",
    "Kinniya",
    "Kiribathgoda",
    "Kottawa",
    "Kuliyapitiya",
    "Kurunegala",
    "Madulla",
    "Maharagama",
    "Mahiyanganaya",
    "Mannar",
    "Matale",
    "Matara",
    "Matugama",
    "Mawanella",
    "Medawachchiya",
    "Medirigiriya",
    "Monaragala",
    "Mullativu",
    "Nallur",
    "Narammala",
    "Nattandiya",
    "Negombo",
    "Nugegoda",
    "Nuwara Eliya",
    "Panadura",
    "Passara",
    "Pelmadulla",
    "Peradeniya",
    "Piliyandala",
    "Polgahawela",
    "Polonnaruwa",
    "Puttalam",
    "Rambukkana",
    "Ratnapura",
    "Rattota",
    "Ruwanwella",
    "Sainthamaruthu",
    "Tambuttegama",
    "Tangalla",
    "Tissamaharama",
    "Trincomalee",
    "Ukuwela",
    "Vavuniya",
    "Warakapola",
    "Wariyapola",
    "Wattala",
    "Weligama",
    "Welimada",
    "Wellawaya",
    "Wennappuwa",
];

export default class Locations extends React.Component {
    render() {
        return (
            <div className={` p-1 d-flex align-items-center border border-2 border-dark rounded ${this.props.className}`}>
                <select name="location" className="form-select form-select-lg border-0 location" onChange={this.props.onchangeFun} value={this.props.value}>
                    {locationsArr.map(location => (
                        <option value={location} key={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <i
                    className="fa-solid fa-location-dot fa-2x me-2"
                    style={{
                        width: "40px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
            </div>
        );
    }
}

export {locationsArr};