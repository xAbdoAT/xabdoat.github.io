// Discord RPC Integration
// Fetches and displays Discord user status and activity

function getElapsedTime(startTimestamp) {
    let currentTime = new Date();
    let elapsedTime = currentTime - new Date(startTimestamp);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const discordApi = 'https://api.lanyard.rest/v1/users/1207492559442681927';
    fetch(discordApi)
        .then(response => response.json())
        .then(data => {
            if (data.success !== true) {
                console.error('I can\'t find user');

                var discordrpcissue = document.getElementById("discordrpcissue");

                discordrpcissue.innerHTML = `
                <div style="width:auto;background-color:rgb(255, 255, 255, 0.09);border:1px solid rgb(255, 255, 255, 0.2);margin-top:8px;margin-bottom:5px;padding: 10px;border-radius: 15px;position: relative;display: inline-flex;place-items: center">
                    <div>
                        <h1 style="color:#ffffff;margin-right:3px;text-align: left;padding: 0;margin: 0 0 0 5px;font-size: 19.7px;max-width: 240px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                            <svg style="vertical-align:-3px;font-size:22px;color:#ff3333" width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8.423-3a.923.923 0 00-.923.923v.385a1 1 0 11-2 0v-.385A2.923 2.923 0 019.423 5H10c1.941 0 3.5 1.591 3.5 3.516 0 .927-.48 1.8-1.276 2.29l-1.7 1.046a1 1 0 01-1.048-1.704l1.7-1.046a.691.691 0 00.324-.586C11.5 7.679 10.82 7 10 7h-.577zm.587 8a1 1 0 100-2H10a1 1 0 100 2h.01z"></path> </g></svg>
                             User not found
                        </h1>
                        <h3 style="color:#ffffff;text-align: left;margin: 3.5px 0 0 5px;padding: 0;font-size: 14.6px;font-weight: 520">Join <a target="_blank" style="color:#bbbbbb;text-decoration:none" href="https://Abdo.is-a.dev">Code & Play</a> to display your status.</h3>
                    </div>
                </div>`;

                return;
            }

            const discordrpc = document.getElementById('discordrpc');

            const discordContainer = document.createElement('div');
            discordContainer.className = 'discordcontainer';
            discordContainer.style = 'margin-bottom: 10px;background-color: rgb(255, 255, 255, 0.09);border: 1px solid rgb(255, 255, 255, 0.02);border-radius: 15px';

            const avatar = document.createElement('img');
            const avatarUrl = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}`;
            const avatarExtension = data.data.discord_user.avatar.startsWith("a_") ? "gif" : "png";
            avatar.src = `${avatarUrl}.${avatarExtension}`;
            avatar.height = '65';
            avatar.draggable = 'true';
            avatar.width = '65';
            avatar.className = 'avatarcontainer imgundragable';
            avatar.style = 'border: 2px solid rgb(255, 255, 255, 0.2)!important';
            discordContainer.appendChild(avatar);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'infocontainer';

            const username = document.createElement('h1');
            username.id = 'username22';
            username.style = 'color: rgb(255 255 255);margin-right: 3px;width: 100%';
            username.textContent = `${data.data.discord_user.username}`;
            infoDiv.appendChild(username);

            const statusDiv = document.createElement('div');
            statusDiv.id = 'status22';

            const activities = document.createElement('h3');
            activities.id = 'activities22';
            activities.style = 'color: rgb(255 255 255);display: block;justify-content: left;margin-top: 4.5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; width: auto;';
            let activityType = '';
            
            if (data.data.activities && data.data.activities.length > 0) {
                let playingActivity = data.data.activities.find(activity => activity.type === 0);
                let customActivity = data.data.activities.find(activity => activity.type === 4);
                let listeningActivity = data.data.activities.find(activity => activity.type === 2);
                let streamingActivity = data.data.activities.find(activity => activity.type === 1);
                let activityText = '';
                
                if (listeningActivity) {
                    activityType = 'LISTENING';
                    let details = listeningActivity.details || '';
                    let name = listeningActivity.name || '';
                    let timestamps = listeningActivity.timestamps;
                    let start = new Date(timestamps.start);
                    let end = new Date(timestamps.end);

                    let totalDuration = Math.floor((end - start) / 1000);
                    let totalMinutes = Math.floor(totalDuration / 60);
                    let totalSeconds = totalDuration % 60;

                    let intervalId = setInterval(function() {
                        let currentTime = new Date();
                        let elapsedTime = Math.floor((currentTime - start) / 1000);
                        let elapsedMinutes = Math.floor(elapsedTime / 60);
                        let elapsedSeconds = elapsedTime % 60;

                        let formattedElapsedTime = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds.toString().padStart(2, '0')}`;
                        let formattedTotalDuration = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;

                        activityText = `${name}${details ? '<br>' + details : ''}<br>${formattedElapsedTime} / ${formattedTotalDuration}`;
                        activities.innerHTML = activityText;

                        if (elapsedTime >= totalDuration) {
                            clearInterval(intervalId);
                            formattedElapsedTime = formattedTotalDuration;
                            activityText = `${name}${details ? '<br>' + details : ''}<br>${formattedElapsedTime} / ${formattedTotalDuration}`;
                            activities.innerHTML = activityText;
                        }
                    }, 100);
                } else if (streamingActivity) {
                    activityType = 'STREAMING';
                    let details = streamingActivity.details || '';
                    let name = streamingActivity.name || '';
                    activityText = `Streaming ${name}${details ? '<br>' + details : ''}`;
                    activities.innerHTML = activityText;
                } else if (playingActivity) {
                    let details = playingActivity.details || '';
                    if (playingActivity.timestamps) {
                        setInterval(function() {
                            let elapsedTime = getElapsedTime(playingActivity.timestamps.start);
                            activityText = `Playing ${playingActivity.name}${details ? '<br>' + details : ''}<br>Elapsed: ${elapsedTime}`;
                            activities.innerHTML = activityText;

                            if (details.length > elapsedTime.length) {
                                activities.style.width = 'auto';
                            } else {
                                activities.style.width = '170px';
                            }
                        }, 100);
                    } else {
                        activityText = `Playing ${playingActivity.name}${details ? '\n' + details : ''}`;
                        activities.innerHTML = activityText.replace("\n", "<br>");
                    }
                } else if (customActivity) {
                    let activityText = customActivity.state;
                    if (customActivity.emoji) {
                        let emojiText = '';
                        if (customActivity.emoji.animated === null) {
                            emojiText = customActivity.emoji.name;
                        } else if (customActivity.emoji.animated) {
                            emojiText = `<img src="https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.gif" width="19" height="19" draggable="false" class="emojicss">`;
                        } else {
                            emojiText = `<img src="https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.png" width="19" height="19" draggable="false" class="emojicss">`;
                        }
                        activityText = `<div style="display: flex; align-items: center;">${emojiText}<span style="text-overflow: ellipsis; overflow: hidden;">${activityText}</span></div>`;
                    }
                    activities.innerHTML = `<div id="activities22" style="color: rgb(255, 255, 255); display: block; justify-content: left; margin-top: 4.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: auto;">${activityText}</div>`;
                } else {
                    activities.textContent = 'No activity';
                }
            } else {
                activities.textContent = 'No activity';
            }

            infoDiv.appendChild(activities);

            if (data.data.discord_status === 'dnd') {
                statusDiv.className = 'statuscontainer_dnd';
            } else if (data.data.discord_status === 'idle') {
                statusDiv.className = 'statuscontainer_idle';
            } else if (data.data.discord_status === 'online') {
                statusDiv.className = 'statuscontainer_online';
            } else if (data.data.discord_status === 'offline') {
                statusDiv.className = 'statuscontainer_offline';
            }

            if (activityType === 'STREAMING') {
                statusDiv.className = ' statuscontainer_streaming';
            }

            statusDiv.style = 'left: 55.5px; font-size: 19.5px; margin-bottom: 3px;';
            statusDiv.innerHTML = getStatus(data.data.discord_status);
            infoDiv.appendChild(statusDiv);

            let largeImageUrl;
            let smallImageUrl;

            if (data.data.activities && data.data.activities.length > 0) {
                let playingActivity = data.data.activities.find(activity => activity.type === 0);
                let listeningActivity = data.data.activities.find(activity => activity.type === 2);
                let streamingActivity = data.data.activities.find(activity => activity.type === 1);

                let activity;
                if (streamingActivity) {
                    activity = streamingActivity;
                } else if (listeningActivity) {
                    activity = listeningActivity;
                } else if (playingActivity) {
                    activity = playingActivity;
                }

                if (activity) {
                    if (activity.assets && activity.assets.large_image) {
                        if (activity.assets.large_image.startsWith('spotify:')) {
                            largeImageUrl = activity.assets.large_image.replace('spotify:', 'https://i.scdn.co/image/');
                        } else {
                            if (activity.assets.large_image.startsWith('mp:attachments/')) {
                                largeImageUrl = 'https://cdn.discordapp.com/attachments/' + activity.assets.large_image.replace('mp:attachments/', '');
                            } else {
                                largeImageUrl = 'https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.large_image + '.png';
                            }
                        }
                    }

                    if (activity.assets && activity.assets.small_image) {
                        if (activity.assets.small_image.startsWith('spotify:')) {
                            smallImageUrl = activity.assets.small_image.replace('spotify:', 'https://i.scdn.co/image/');
                        } else {
                            if (activity.assets.small_image.startsWith('mp:attachments/')) {
                                smallImageUrl = 'https://cdn.discordapp.com/attachments/' + activity.assets.small_image.replace('mp:attachments/', '');
                            } else {
                                smallImageUrl = 'https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.small_image + '.png';
                            }
                        }
                    }
                }
            }

            discordContainer.appendChild(infoDiv);

            if (largeImageUrl) {
                const largeImage = document.createElement('img');
                largeImage.src = largeImageUrl;
                largeImage.style = 'height: 63px;width: 63px;border-radius: 10px; margin-left:10px;';
                discordContainer.appendChild(largeImage);
            }

            if (smallImageUrl) {
                const smallImage = document.createElement('img');
                smallImage.src = smallImageUrl;
                smallImage.style = 'height: 25px;width: 25px;border-radius: 150px;position: absolute;bottom: 11px;right: 2px; margin-left:10px;';
                discordContainer.appendChild(smallImage);
            }

            discordrpc.appendChild(discordContainer);
        }).catch(error => console.error('Error fetching data from Discord API:', error));

    function getStatus(status) {
        switch (status) {
            case 'dnd':
                return '<svg style="background-color: rgb(255, 255, 255, 0.2)!important; border-radius: 50%!important; padding: 0.5px 0.5px 0.2px 0.5px!important;" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z" fill="currentColor"></path></svg>';
            case 'idle':
                return '<svg style="background-color: rgb(255, 255, 255, 0.2)!important; border-radius: 50%!important; padding: 0.5px 0.5px 0.2px 0.5px!important;" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M235.54 150.21a104.84 104.84 0 0 1-37 52.91A104 104 0 0 1 32 120a103.09 103.09 0 0 1 20.88-62.52a104.84 104.84 0 0 1 52.91-37a8 8 0 0 1 10 10a88.08 88.08 0 0 0 109.8 109.8a8 8 0 0 1 10 10Z"></path></svg>';
            case 'online':
                return '<svg style="background-color: rgb(255, 255, 255, 0.2)!important; border-radius: 50%!important; padding: 0.5px 0.5px 0.2px 0.5px!important;" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m0 2a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6m0 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z"></path></svg></div>';
            case 'offline':
                return '<svg style="background-color: rgb(255, 255, 255, 0.2)!important; border-radius: 50%!important; padding: 0.5px 0.5px 0.2px 0.5px!important;" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.06 7.94a1.5 1.5 0 0 1 0 2.12L14.122 12l1.94 1.94a1.5 1.5 0 0 1-2.122 2.12L12 14.122l-1.94 1.94a1.5 1.5 0 0 1-2.12-2.122L9.878 12l-1.94-1.94a1.5 1.5 0 1 1 2.122-2.12L12 9.878l1.94-1.94a1.5 1.5 0 0 1 2.12 0ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12Zm12-9a9 9 0 1 0 0 18a9 9 0 0 0 0-18Z"></path></svg></div>'
            default:
                return '';
        }
    }
});