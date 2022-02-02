import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../auth/auth-context';

export const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const [form, setForm] = useState({
		email: '',
		password: '',
		rememberme: true,
	});

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setForm({ ...form, [name]: value });
	};

	const toggleCheck = () => {
		setForm({ ...form, rememberme: !form.rememberme })
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = form;
		const ok = await login(email, password);
		if (form.rememberme) {
			localStorage.setItem('email', form.email);
		} else {
			localStorage.removeItem('email');
		}
		if (!ok) {
			toast.error('Verifique el usuario y contraseña');
		}
	};

	useEffect(() => {
		const remembermeEmail = localStorage.getItem('email');
		if (remembermeEmail) {
			setForm((form) => ({
				...form,
				email: remembermeEmail,
				rememberme: true
			}));
		}
	}, []);

  return (
    <form
			onSubmit={handleSubmit}
			className="login100-form validate-form flex-sb flex-w"
		>
			<span className="login100-form-title mb-3">
				Chat - Ingreso
			</span>
			<div className="wrap-input100 validate-input mb-3">
				<input
					className="input100"
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
				<span className="focus-input100"></span>
			</div>
			<div className="wrap-input100 validate-input mb-3">
				<input
					className="input100"
					type="password"
					name="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
				/>
				<span className="focus-input100"></span>
			</div>
			<div className="row mb-3">
				<div className="col" onClick={toggleCheck}>
					<input
						className="input-checkbox100"
						id="ckb1"
						type="checkbox"
						name="rememberme"
						checked={form.rememberme}
						readOnly
					/>
					<label className="label-checkbox100">
						Recordarme
					</label>
				</div>
				<div className="col text-right">
					<Link to="/auth/register" className="txt1">
						Nueva cuenta?
					</Link>
				</div>
			</div>
			<div className="container-login100-form-btn m-t-17">
				<button
					className="login100-form-btn"
					disabled={!form.email || !form.password}
				>
					Ingresar
				</button>
			</div>
		</form>
  );
};
