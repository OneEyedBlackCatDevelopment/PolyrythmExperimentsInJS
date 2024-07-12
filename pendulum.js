let pendulums = [];

const g = 9.81;
const theta0 = Math.PI / 2.1;
const omega0 = 0.0;

function createGradientColor(value) {
	const r = Math.floor(255 * value);
	const g = 100;
	const b = Math.floor(255 * (1 - value));
	return `rgb(${r},${g},${b})`;
}

function updatePendulums() {

	const originX = canvas.width / 2;
	const originY = 150;
	
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (const pendulum of pendulums) {
		const x = originX + pendulum.L * Math.sin(pendulum.theta);
		const y = originY + pendulum.L * Math.cos(pendulum.theta);
		
		drawColor =  pendulum.color;
		
		
		if( pendulum.theta >=  -0.03 && pendulum.theta <= 0.03) {
			drawColor = '#FFFFFF';
			if( pendulum.allreadyHit == false ) {
				pendulum.allreadyHit = true;
				playSound( pendulum.audioPlayerId);
			}
		} else {
			pendulum.allreadyHit = false;
		}
		
	
		context.shadowColor = drawColor;
		context.shadowBlur = 0;
		context.strokeStyle = drawColor;
		context.beginPath();
		context.moveTo(originX, originY );
		context.lineTo(x, y);
		context.lineWidth = 0.3;
		context.stroke();

		context.beginPath();
		context.shadowBlur = 30;
		context.arc(x, y, 13, 0, Math.PI * 2);
		context.fillStyle = drawColor;
		context.fill();
		
		context.beginPath();
		context.shadowBlur = 10;
		context.arc(x, y, 12, 0, Math.PI * 2);
		context.fillStyle = '#000000';
		context.fill();
		
		const alpha = -g / pendulum.L * Math.sin(pendulum.theta);
		pendulum.omega += alpha * dt;
		pendulum.theta += pendulum.omega * dt;
	}
	requestAnimationFrame(updatePendulums);
}


function createPendulums() {
	
	 const pendulumControls = document.getElementById('pendulumControls');
	 
	 // Create 10 pendulums with individual length controls
            for (let i = 1; i <= 9; i++) {
                const pendulumLength = 100 + 50 * Math.sqrt(i);
                const lengthControl = document.createElement('input');
                lengthControl.setAttribute('type', 'range');
                lengthControl.setAttribute('min', '20');
                lengthControl.setAttribute('max', '300');
                lengthControl.setAttribute('step', '1');
                lengthControl.setAttribute('value', pendulumLength);
                lengthControl.classList.add('length-control');
                lengthControl.addEventListener('input', function () {
                    pendulums[i - 1].L = parseFloat(this.value);
                });

                const label = document.createElement('label');
                label.innerHTML = `Pendulum ${i}: `;
                label.appendChild(lengthControl);

                pendulumControls.appendChild(label);


				const audioPlayer = document.createElement('audio');
				audioPlayer.setAttribute("id", `audio${i}` );
				audioPlayer.setAttribute("src", `./sounds/sound${i}.mp3`);
				audioPlayer.setAttribute("preload", "auto"  );
				pendulumControls.appendChild(audioPlayer);

                const color = createGradientColor(i / 10);
                pendulums.push({
                    L: pendulumLength,
                    theta: theta0,
                    omega: omega0,
                    color: color,
					audioPlayerId: `audio${i}`,
					allreadyHit: false
                });
            }

}

function playSound( audioPlayerId ) {
	var audio = document.getElementById( audioPlayerId );
	audio.currentTime = 0;
	audio.play();
}
	  


