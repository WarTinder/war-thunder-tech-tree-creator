'use strict';

let vehicle_list = []
let json_vehicle_list = localStorage.getItem('json_vehicle_list')
json_vehicle_list = JSON.parse(json_vehicle_list)
if (json_vehicle_list === null) {
    json_vehicle_list = []
}
console.log(json_vehicle_list)
for (let i = 0; i < json_vehicle_list.length; i ++) {
    let parsed = JSON.parse(json_vehicle_list[i])
    console.log(parsed)
    let new_vehicle = new Vehicle(parsed.short_name, parsed.br, parsed.rank, parsed.branch, parsed.long_name, parsed.research_type, parsed.description, parsed.thumbnail, parsed.connection_type)
    vehicle_list.push(new_vehicle)
}
organize_vehicles(vehicle_list)
display_vehicles(vehicle_list)
console.log(vehicle_list)

// Define the setRankWidth function
function setRankWidth() {
    let maxRankWidth = 0;

    // Find the maximum width among all ranks
    document.querySelectorAll('.rank').forEach(rank => {
        const rankWidth = rank.getBoundingClientRect().width;
        if (rankWidth > maxRankWidth) {
            maxRankWidth = rankWidth;
        }
    });

    // Set the width of all ranks to the maximum width
    document.querySelectorAll('.rank').forEach(rank => {
        rank.style.width = maxRankWidth + 'px';
    });
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(() => {
    setRankWidth();
});

// Start observing changes in the DOM
observer.observe(document.body, { subtree: true, childList: true });

// Now whenever a vehicle is added or removed, setRankWidth will be called automatically

// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', setRankWidth);

// Add vehicle input
function read_vehicle_input() {
    let vehicle_short_name = document.querySelector('#vehicleShortName').value
    if (vehicle_short_name.length === 0) {
        window.alert('You must enter a name for the vehicle!')
        return false
    }
    let vehicle_long_name = document.querySelector('#vehicleLongName').value
    if (vehicle_long_name.length === 0) {
        vehicle_long_name = undefined
    }
    const vehicle_br = Number(document.querySelector('#vehicleBr').value)
    if (vehicle_br < 0 || vehicle_br === NaN) {
        window.alert('You must enter a number greater than or equal to 0 as the vehicle BR!')
        return false
    }
    let vehicle_rank = Number(document.querySelector('#vehicleRank').value)
    if (vehicle_rank <= 0 || vehicle_rank === NaN || Number.isInteger(vehicle_rank) == false) {
        window.alert('You must enter an integer greater than or equal to 1 as the vehicle rank!')
        return false
    }
    let vehicle_branch = Number(document.querySelector('#vehicleBranch').value)
    if (vehicle_branch <= 0 || vehicle_branch === NaN || Number.isInteger(vehicle_branch) == false) {
        window.alert('You must enter an integer greater than or equal to 1 as the vehicle branch!')
        return false
    }
    let vehicle_thumbnail = document.querySelector('#vehicleThumbnail').value
    if (vehicle_thumbnail.length === 0) {
        vehicle_thumbnail = undefined
    }
    let vehicle_description = document.querySelector('#vehicleDesc')
    if (vehicle_description.length === 0) {
        vehicle_description = undefined
    }
    let vehicle_connection_type = document.querySelector('#vehicleConnectionType').value
    let vehicle_research_type = document.querySelector('#vehicleResearchType').value

    let vehicle = new Vehicle(vehicle_short_name, vehicle_br, vehicle_rank, vehicle_branch, vehicle_long_name, vehicle_research_type, vehicle_description, vehicle_thumbnail, vehicle_connection_type)
    vehicle_list.push(vehicle)
    return true
}

// Add vehicle button
document.querySelector('#addVehicleSubmit').addEventListener('click', () => {
    if (read_vehicle_input()) {
        let modalElement = document.querySelector('#addModal');
        let modal = new bootstrap.Modal(modalElement);
        modal.hide();
        setTimeout(() => {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            let backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }, 100);
        json_vehicle_list = []
        for (let i = 0; i < vehicle_list.length; i ++) {
            json_vehicle_list.push(JSON.stringify(vehicle_list[i]))
        }
        localStorage.setItem('json_vehicle_list', JSON.stringify(json_vehicle_list))
        console.log(vehicle_list);
        organize_vehicles(vehicle_list)
        display_vehicles(vehicle_list)
        setRankWidth()
    }
});

// Edit vehicle input
function read_vehicle_edit_input() {
    let vehicle_edit_short_name = document.querySelector('#vehicleEditShortName').value
    if (vehicle_edit_short_name.length === 0) {
        window.alert('You must enter a name for the vehicle!')
        return false
    }
    let vehicle_edit_long_name = document.querySelector('#vehicleEditLongName').value
    if (vehicle_edit_long_name.length === 0) {
        vehicle_edit_long_name = undefined
    }
    const vehicle_edit_br = Number(document.querySelector('#vehicleEditBr').value)
    if (vehicle_edit_br < 0 || vehicle_edit_br === NaN) {
        window.alert('You must enter a number greater than or equal to 0 as the vehicle BR!')
        return false
    }
    let vehicle_edit_rank = Number(document.querySelector('#vehicleEditRank').value)
    if (vehicle_edit_rank <= 0 || vehicle_edit_rank === NaN || Number.isInteger(vehicle_edit_rank) == false) {
        window.alert('You must enter an integer greater than or equal to 1 as the vehicle rank!')
        return false
    }
    let vehicle_edit_branch = Number(document.querySelector('#vehicleEditBranch').value)
    if (vehicle_edit_branch <= 0 || vehicle_edit_branch === NaN || Number.isInteger(vehicle_edit_branch) == false) {
        window.alert('You must enter an integer greater than or equal to 1 as the vehicle branch!')
        return false
    }
    let vehicle_edit_thumbnail = document.querySelector('#vehicleEditThumbnail')
    if (vehicle_edit_thumbnail.length === 0) {
        vehicle_edit_thumbnail = undefined
    }
    let vehicle_edit_description = document.querySelector('#vehicleEditDesc')
    if (vehicle_edit_description.length === 0) {
        vehicle_edit_description = undefined
    }
    let vehicle_edit_connection_type = document.querySelector('#vehicleEditConnectionType').value
    let vehicle_edit_research_type = document.querySelector('#vehicleEditResearchType').value

    let vehicle = new Vehicle(vehicle_edit_short_name, vehicle_edit_br, vehicle_edit_rank, vehicle_edit_branch, vehicle_edit_long_name, vehicle_edit_research_type, vehicle_edit_description, vehicle_edit_thumbnail, vehicle_edit_connection_type)
    vehicle_list.push(vehicle)
    return true
}

// Edit vehicle button
document.querySelector('#editVehicleSubmit').addEventListener('click', () => {
    if (read_vehicle_edit_input()) {
        let modalElement = document.querySelector('#addModal');
        let modal = new bootstrap.Modal(modalElement);
        modal.hide();
        setTimeout(() => {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            let backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }, 100);
        console.log(vehicle_list);
    }
});

function display_vehicles(vehicle_list) {
    for (let i = 0; i < vehicle_list.length; i ++) {
        if (vehicle_list[i].has_div === false){
            let current_rank = `rank_${vehicle_list[i].rank}`;
            vehicle_list[i].display(current_rank);
        }
    }
}

function organize_vehicles(vehicle_list) {
    if (vehicle_list.length > 0) {
        let max_present_rank = 0
        for (let i = 0; i < vehicle_list.length; i ++) {
            if (vehicle_list[i].rank > 0) {
                max_present_rank = vehicle_list[i].rank
            }
        }
    }
}