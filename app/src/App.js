import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [state, setState] = useState("");

	const randnum = () => {
		let randArray = new Uint32Array(1);
		crypto.getRandomValues(randArray);
		return (randArray[0]);
	}

	const cipher = (n, base) => {
		let max = 126 - n;
		for (let i = 0; i < base.length; i++) {
			if (base[i] >= 33 && base[i] <= max)
				base[i] += n;
			else if (base[i] >= (max + 1) && base[i] <= 126)
				base[i] = 33 + (n - (126 - base[i]) - 1);
		}
		return (base);
	}

	const generate = () => {
		const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
		let len, gen, shifted, pass;

		pass = "";
		if (crypto && crypto.getRandomValues) {
			setState("");
			len = randnum() % 4 + 12;
			gen = [];
			for (let i = 0; i < len; i++)
				gen[i] = randnum() % 94 + 33;

			shifted = cipher(randnum() % 16 + 15, gen);
			for (let i = 0; i < len; i++)
				pass += String.fromCharCode(shifted[i]);
		}
		// I could fix this to make it more efficient. But I'm lazy rn so.
		regex.test(pass) ? setState(pass) : generate();
	}

	const copy = () => {
		const text = document.getElementById('text');

		navigator.clipboard.writeText(text.textContent);
		toast("Copied to clipboard!");
	}

	return (
		<div id="main">
			<div id="word">
				<h1>/ᐠ - ˕ -マ RanPaGen /ᐠ - ˕ -マ</h1>
				<p>Mars' Random Password Generator</p>
				<p>because I don't trust existing ones.</p>
				<div id="butt">
					<button className="button" onClick={generate}>Generate</button>
				</div>
				<div id="pass">
					<h3 style={{paddingRight: '20px'}} id="text">{state}</h3>
					{state && <FontAwesomeIcon icon={faCopy} onClick={copy}/>}
					<ToastContainer
						autoClose={2000}
						style={{ background: '#000000' }}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
