import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../auth/auth-context';

export const RegisterPage = () => {
	const { register } = useContext(AuthContext);
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const ok = await register(form.name, form.email, form.password);
		if (!ok) {
			toast.error('Error al crear el usuario');
		}
	};

  return (
    <form
			className="login100-form validate-form flex-sb flex-w"
			onSubmit={handleSubmit}
		>
			<span className="login100-form-title mb-3">
				Chat - Registro
			</span>

			<div className="wrap-input100 validate-input mb-3">
				<input
					className="input100"
					type="text"
					name="name"
					placeholder="Nombre"
					value={form.name}
					onChange={handleChange}
				/>
				<span className="focus-input100"></span>
			</div>

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
				<div className="col text-right">
					<Link to="/auth/login" className="txt1">
						Ya tienes cuenta?
					</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button
					className="login100-form-btn"
					disabled={!form.name || !form.email || !form.password}
				>
					Crear cuenta
				</button>
			</div>

		</form>
  );
};
