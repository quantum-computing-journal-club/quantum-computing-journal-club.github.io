function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("overlay").style.display = "block"; // Show overlay
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none"; // Hide overlay
}

// Close the side menu when clicking outside
document.getElementById('overlay').addEventListener('click', closeNav);

window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.pageYOffset > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
};

// Fetch data from JSON file for scheduled speakers
fetch('scheduled_speakers.json')
    .then(response => response.json())
    .then(data => {
        const scheduledSpeakers = document.getElementById('scheduled-speakers-input');

        // Loop through the data and generate the HTML
        data.forEach(meeting => {
            // Create the main list item for the meeting
            const li = document.createElement('li');
            li.innerHTML = `🗓️<strong>${meeting.date} ️   👤 ${meeting.speaker}</strong>`;

            // Create a sublist for the paper, authors, and tags
            const sublist = document.createElement('ul');

            // Paper entry
            const paperItem = document.createElement('li');
            paperItem.innerHTML = `<span class="label">Paper:</span> <a href="${meeting.paper.link}" target="_blank">${meeting.paper.title}</a>`;
            sublist.appendChild(paperItem);

            // Authors entry
            const authorsItem = document.createElement('li');
            authorsItem.innerHTML = `<span class="label">Authors:</span> ${meeting.authors.join(', ')}`;
            sublist.appendChild(authorsItem);

            // Tags entry (only show if present)
            if (meeting.tags && meeting.tags.length > 0) {
                const tagsItem = document.createElement('li');
                tagsItem.innerHTML = `<span class="label">Tags:</span>`;
                meeting.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.classList.add('tag');
                    tagSpan.textContent = tag;
                    tagsItem.appendChild(tagSpan);
                });
                sublist.appendChild(tagsItem);
            }

            // Append sublist to the main list item
            li.appendChild(sublist);
            // Append the main list item to the meetings list
            scheduledSpeakers.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

// Fetch data from JSON file for past meetings
fetch('meetings_vault.json?' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        const meetingsList = document.getElementById('meetings-vault-input');

        // Loop through the data and generate the HTML
        data.forEach(meeting => {
            // Create the main list item for the meeting
            const li = document.createElement('li');
            li.innerHTML = `🗓️<strong>${meeting.date} ️   👤 ${meeting.speaker}</strong>`;

            // Append the description if it exists
            if (meeting.description) {
                const descriptionPara = document.createElement('p');
                descriptionPara.innerHTML = meeting.description;
                li.appendChild(descriptionPara);
            }

            // Create a sublist for the paper, authors, and tags
            const sublist = document.createElement('ul');

            // Paper entry
            const paperItem = document.createElement('li');
            paperItem.innerHTML = `<span class="label">Paper:</span> <a href="${meeting.paper.link}" target="_blank">${meeting.paper.title}</a>`;
            sublist.appendChild(paperItem);

            // Authors entry
            const authorsItem = document.createElement('li');
            authorsItem.innerHTML = `<span class="label">Authors:</span> ${meeting.authors.join(', ')}`;
            sublist.appendChild(authorsItem);

            // Additional paper entry
            if (meeting.paper_2) {
                const paper2Item = document.createElement('li');
                paper2Item.innerHTML = `<span class="label">Paper:</span> <a href="${meeting.paper_2.link}" target="_blank">${meeting.paper_2.title}</a>`;
                sublist.appendChild(paper2Item);

                // and authors entry
                const authors2Item = document.createElement('li');
                authors2Item.innerHTML = `<span class="label">Authors:</span> ${meeting.authors_2.join(', ')}`;
                sublist.appendChild(authors2Item);
            }

            // Tags entry (only show if present)
            if (meeting.tags && meeting.tags.length > 0) {
                const tagsItem = document.createElement('li');
                tagsItem.innerHTML = `<span class="label">Tags:</span>`;
                meeting.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.classList.add('tag');
                    tagSpan.textContent = tag;
                    tagsItem.appendChild(tagSpan);
                });
                sublist.appendChild(tagsItem);
            }

            // Attachments entry (if present)
            if (meeting.attachments && meeting.attachments.length > 0) {
                const attachmentsItem = document.createElement('li');
                attachmentsItem.innerHTML = `<span class="label">Attachments:</span>`;
                meeting.attachments.forEach(attachment => {
                    const attachmentLink = document.createElement('a');
                    attachmentLink.href = attachment.path;
                    attachmentLink.target = "_blank";
                    attachmentLink.textContent = attachment.name || 'Download';
                    attachmentsItem.appendChild(attachmentLink);
                    attachmentsItem.appendChild(document.createElement('br')); // Add line breaks between multiple attachments
                });
                sublist.appendChild(attachmentsItem);
            }

            // Append sublist to the main list item
            li.appendChild(sublist);
            // Append the main list item to the meetings list
            meetingsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });
