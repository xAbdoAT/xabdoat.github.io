// Discord Server Widget
// Fetches and displays Discord server information

fetch('https://serverinfo.vercel.app/GtHgXqFv7C')
    .then(response => response.json())
    .then(data => {
        const discordServer = document.getElementById('discordserver');
        discordServer.className = 'layout_2_4510bb0b2f33c8542865ef1267675955_double_wrapper__E_qyW';
        discordServer.style = 'flex-basis: 50%';

        const myLink = document.createElement('a');
        myLink.setAttribute('style', 'cursor: pointer');
        myLink.target = '_blank';
        myLink.href = 'https://discord.gg/GtHgXqFv7C';

        const doubleWrapper = document.createElement('div');
        doubleWrapper.className = 'layout_2_4510bb0b2f33c8542865ef1267675955_double_wrapper__E_qyW';
        doubleWrapper.style = 'flex-basis: 50%;font-size:10px;margin-bottom: 10px;';

        const other = document.createElement('div');
        other.className = 'layout_2_4510bb0b2f33c8542865ef1267675955_other__JPn53';
        other.style = 'background-color: rgba(255, 255, 255, 0.09);border: 1px solid rgba(255, 255, 255, 0.106);';

        const discordInvite = document.createElement('div');
        discordInvite.className = 'layout_2_4510bb0b2f33c8542865ef1267675955_discord_invite__gJmuE';

        const avatar = document.createElement('img');
        avatar.src = data.avatar_url;
        discordInvite.appendChild(avatar);

        const guildInfo = document.createElement('div');
        guildInfo.className = 'layout_2_4510bb0b2f33c8542865ef1267675955_guild_info__rVXiI';

        const username = document.createElement('h1');
        username.style = 'color: rgb(255, 255, 255);';
        username.textContent = `${data.guild_name}`;
        guildInfo.appendChild(username);

        const memberCount = document.createElement('h3');
        memberCount.style = 'color: rgba(255, 255, 255, 0.6);';
        memberCount.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="6.5 6.5 3 3" style="font-size: 7px; color: rgb(35, 165, 89);">
                <path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
            </svg> 
            ${data.online_members.toLocaleString()} Online  
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="6.5 6.5 3 3" style="font-size: 7px; color: rgb(128, 132, 142); margin-left: 7px;">
                <path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
            </svg> 
            ${data.total_members.toLocaleString()} Members
        `;
        guildInfo.appendChild(memberCount);

        discordInvite.appendChild(guildInfo);
        other.appendChild(discordInvite);
        doubleWrapper.appendChild(other);
        myLink.appendChild(doubleWrapper);
        discordServer.appendChild(myLink);
    })
    .catch(error => console.error('Error fetching Discord server data:', error));