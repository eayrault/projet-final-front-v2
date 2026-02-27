import { useState, type FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await register(formData);
      setSuccess(true);
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 text-base rounded border border-gray-400 bg-zinc-800 text-white focus:outline-none focus:border-indigo-500";
  const labelClass = "block mb-1 text-sm text-gray-300";

  return (
    <div className="max-w-md mx-auto px-5 py-6">
      <h2 className="text-2xl font-bold text-white mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="text-red-400 px-4 py-2 bg-red-950 border border-red-500 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-400 px-4 py-2 bg-green-950 border border-green-500 rounded">
            Registration successful! You can now login.
          </div>
        )}

        <div>
          <label htmlFor="username" className={labelClass}>
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="first_name" className={labelClass}>
            First Name:
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="last_name" className={labelClass}>
            Last Name:
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white bg-green-600 rounded hover:bg-green-700 transition-colors ${
            loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
