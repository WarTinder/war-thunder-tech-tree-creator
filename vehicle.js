class Vehicle {
    constructor(short_name, br, rank, branch, long_name = null, research_type = null, description = null, thumbnail = null, connection_type, badge_bg = null, statcard_imgs = null, following = null) {
        this.short_name = short_name,
        this.br = br,
        this.rank = rank,
        this.branch = branch,
        this.long_name = long_name,
        this.research_type = research_type,
        this.following = following,
        this.connection_type = connection_type
        this.badge = null,
        this.badge_bg = badge_bg,
        this.thumbnail = thumbnail,
        this.statcard_imgs = statcard_imgs,
        this.description = description,
        this.uuid = crypto.randomUUID()
        this.has_div = false
    }

    display(current_rank) {
        this.create_div(current_rank);
        this.display_badge();
        this.display_thumbnail();
    }
    
    create_div(current_rank) {
        // Create all rank elements up to the current rank
        let max_rank = this.get_max_rank();
        for (let i = 1; i <= max_rank; i++) {
            let rank_id = `rank_${i}`;
            let rank_element = document.getElementById(rank_id);
            if (!rank_element) {
                // Create the rank element if it doesn't exist
                rank_element = document.createElement('table');
                rank_element.id = rank_id;
                rank_element.classList.add('rank');
                document.getElementById('techTree').appendChild(rank_element);
            }
        }
        
        // Create vehicle elements for the current rank
        let rank_element = document.getElementById(current_rank);
        if (!rank_element) {
            console.error("Rank element does not exist.");
            return;
        }
        
        let inserted = false;
    
        // Check if any existing row has a vehicle with the same branch number
        for (let i = 1; i <= rank_element.rows.length; i++) {
            let row = rank_element.querySelector(`tr:nth-child(${i})`);
            let vehicles_in_row = Array.from(row.querySelectorAll('.vehicle'));
            let branch_numbers_in_row = vehicles_in_row.map(vehicle => parseInt(vehicle.classList[1].split('_')[1]));
            if (!branch_numbers_in_row.includes(this.branch)) {
                // Insert vehicle into existing row
                let vehicle = document.createElement('td');
                vehicle.setAttribute('id', this.uuid);
                vehicle.classList.add('vehicle', `branch_${this.branch}`);
                row.appendChild(vehicle);
                
                inserted = true;
                break;
            }
        }
        
        // If no existing row is found, create a new row
        if (!inserted) {
            let new_row = document.createElement('tr');
            new_row.classList.add('row');
            new_row.id = `${current_rank}_row_${rank_element.rows.length + 1}`;
            
            let vehicle = document.createElement('td');
            vehicle.setAttribute('id', this.uuid);
            vehicle.classList.add('vehicle', `branch_${this.branch}`);
            
            new_row.appendChild(vehicle);
            rank_element.appendChild(new_row);
        }
    
        // Ensure that the content fits within the container
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.maxHeight = '100vh';
    
        this.has_div = true;
    }

    get_max_rank() {
        let max_rank = 0;
        for (let i = 0; i < vehicle_list.length; i++) {
            if (vehicle_list[i].rank > max_rank) {
                max_rank = vehicle_list[i].rank;
            }
        }
        return max_rank;
    }

    display_badge() {
        if (this.research_type === 'Researchable' || this.research_type === 'Reserve' || this.research_type === 'Event') {
            this.badge = 'https://i.imgur.com/9mT03Mp.png'
        }
        else if (this.research_type === 'Premium') {
            this.badge = 'https://i.imgur.com/YmHHsTv.png'
        }
        else if (this.research_type === 'Squadron') {
            this.badge = 'https://i.imgur.com/vOCGHVF.png'
        }
        else if (this.research_type === 'Event (alternate background)') {
            this.badge = 'https://i.imgur.com/LrlAXyE.png'
        }
        let vehicle_badge = document.createElement('img')
        vehicle_badge.src = this.badge
        vehicle_badge.classList.add('vehicle-badge')
        document.getElementById(this.uuid).appendChild(vehicle_badge)
    }

    display_thumbnail() {
        if (this.thumbnail) {
            let vehicle_thumbnail = document.createElement('img')
            vehicle_thumbnail.src = this.thumbnail
            vehicle_thumbnail.classList.add('vehicle-thumbnail')
            document.getElementById(this.uuid).appendChild(vehicle_thumbnail)
        }
    }
}