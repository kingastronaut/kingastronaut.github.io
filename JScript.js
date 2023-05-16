
	
	
      // Initialize the player object

      let player;
	  let timestamps = {
	  start: 0,
	  end: 0
	  };
     
      // Function to update the current time display
	  
      function updateCurrentTime() {
		
		const endSeconds = Number(document.querySelector("#end-time").value);
		
		//move this later!! To listen to range event
		document.querySelector("#slider-time").innerHTML = "Clip length: " + endSeconds + " seconds.";


      }
      
      // Listen for form submission event
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        
	//	clearBox("player");
		
        // Get the YouTube link
        const link = document.querySelector("#link").value;
        
        // Extract the video ID from the link
		
		if (link.search("v=") != -1) {
			var videoId = link.split("v=")[1];
		} else {
			var videoId = link.split(".be/")[1];
		}
        
		
        // Create the player object if it does not exist, otherwise update existing

		if (typeof player != 'object'){
		player = new YT.Player("player", {
          height: "360",
          width: "640",
          videoId: videoId,
          events: {
            "onReady": () => {
              // Set an interval to update the current time display every second
              setInterval(updateCurrentTime, 150);
            }
          }
        });
		} else {
			player.loadVideoById({videoId: videoId, startSeconds:0});
            }
          });
		  
		  
		  
		 // button for playing time range
		
		document.querySelector("#play-button").addEventListener("click", (event) => {
			event.preventDefault();
			
			 // Get the YouTube link
			const link2 = document.querySelector("#link").value;
        
			// Extract the video ID from the link
			
			if (link2.search("v=") != -1) {
				var videoId2 = link2.split("v=")[1];
			} else {
				var videoId2 = link2.split(".be/")[1];
		}
			//const videoId2 = link2.split("v=")[1];
			
			//create link with timestamps and play the range
			const videoStartSeconds = player.getCurrentTime();
			const videoEndSeconds = Number(document.querySelector("#end-time").value) + videoStartSeconds;
			const videoIdRange = videoId2 + "?start=" + Math.floor(videoStartSeconds) + "&end=" + Math.floor(videoEndSeconds);
			
			if (timestamps["start"] == 0 && timestamps["end"] == 0){
				timestamps = {
				start: videoStartSeconds,
				end: videoEndSeconds}
				
				if (timestamps["end"] > 3600){
				var startT = new Date(Math.floor(timestamps["start"]) * 1000).toISOString().substring(11, 19);
				var endT = new Date(Math.floor(timestamps["end"]) * 1000).toISOString().substring(11, 19);
				} else {
				var startT = new Date(Math.floor(timestamps["start"]) * 1000).toISOString().substring(14,19);
				var endT = new Date(Math.floor(timestamps["end"]) * 1000).toISOString().substring(14,19);
				}
				document.getElementById("reset-button").hidden = false;
				document.querySelector("#play-button").innerHTML = "Play: " + startT + " - " + endT;
			};
			
			
			player.loadVideoById({videoId: videoId2, startSeconds:timestamps["start"] - 0.6, endSeconds: timestamps["end"]});

		});
		
		// reset button
		
		function fReset(){
			document.querySelector("#play-button").innerHTML = "Play Selected Time Span";
			timestamps = {
				start: 0,
				end: 0}
			document.getElementById("reset-button").hidden = true;
		}
		
		
		//recording buttons
		

		
