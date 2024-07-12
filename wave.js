const numBalls = 64;
const balls = []; 
const numSounds = 8;
 
function createBalls() {
	
	
	
	const audioControls = document.getElementById('audioControls');
	
	// Create ball objects
	for (let i = 0; i < numBalls; i++) {
		
		
		const soundId = getSoundIndexFromIndex(i);
		
		
		
		const audioPlayer = document.createElement('audio');
			audioPlayer.setAttribute("id", `audio${i}` );
			audioPlayer.setAttribute("src", `./sounds/sound${getSoundIndexFromIndex(i)}.mp3`);
			audioPlayer.setAttribute("preload", "auto"  );
			audioControls.appendChild(audioPlayer);
		
		
		const colorGradient =  255/numSounds * soundId; 
		
		balls.push({
			x: i * canvas.width/numBalls,
			y: 0,
			radius: 10,
			halo: 10,
			speedX: 0, 
			speedY: 0.000001*i,
			color: `rgb(${255},${100},${255-colorGradient})`,
			audioPlayerId: `audio${i}`,
			allreadyHit: false,
		});
	}
	
}

function getSoundIndexFromIndex( index ) 
{
	fullIndex = index%(2*numSounds);
	soundIndex = 0;
	
	if( fullIndex >= numSounds ){
		soundIndex = 2*numSounds - fullIndex+1;
	} else {
		soundIndex = fullIndex +1;
	}
	return soundIndex;
}




function drawBall(index, hit) {
	context.beginPath();


	const ball = balls[index];

	if( hit != 0 ) {
		context.shadowBlur = 50;
		context.fillStyle = `rgb(${255},${255},${255})`;
		
		
		 
	} else {
		context.shadowBlur = ball.halo;
		context.fillStyle = ball.color;

	}

	context.shadowColor = context.fillStyle;
	context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	context.fill();

}


function playSound( audioPlayerId ) {
	var audio = document.getElementById( audioPlayerId );
	audio.currentTime = 0;
	audio.play();
}
	  



function updateBalls() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < numBalls; i++) {
		const ball = balls[i];

		ball.x += ball.speedX;


		//if (ball.x + ball.radius >= canvas.width ){
		//	 ball.x = 0.0;
		//}

		// Update ball's vertical position based on a sine wave
		sinY = Math.sin((i / numBalls) * Math.PI * 2 + Date.now() * ball.speedY);
		ball.y = canvas.height/2 +  sinY * ((canvas.height/2)-ball.radius);
		
		c =  Math.abs( Math.floor(127.5*sinY ))*2;
		d = (i / numBalls) * 255;
		
		ball.radius =  Math.abs(15 * sinY ) + 3;
		ball.halo = 18 - Math.abs(15 * sinY );
	
		//ball.color = `rgb(${255-d},${255-d},${d})`;

		// Draw the ball
		if(ball.y <= (ball.radius+0.1) ) {
			drawBall(i, 1);
			if( ball.allreadyHit == false ) { playSound( ball.audioPlayerId ); 	}
			ball.allreadyHit=true;
		} else if( ball.y >= (canvas.height - ball.radius - 0.1) ) {
			drawBall(i, 1);
			if( ball.allreadyHit == false ) { playSound( ball.audioPlayerId ); 	}
			ball.allreadyHit=true;
		} else {
			drawBall(i, 0);
			ball.allreadyHit=false;
		}
		
		
	}

	requestAnimationFrame(updateBalls);
}






