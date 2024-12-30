import { useEffect , useState} from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Logged in:", { username, password });
        window.location.href="/homepage";
      };

      useEffect(()=>{
        document.title = "Login";
      })
  return (
    <div className='text-center mt-[10%]'>
      <form
        onSubmit={handleSubmit}
        className="w-[25vw] bg-blue-700 mx-auto h-auto text-white rounded-lg flex flex-col gap-6 py-8 px-10 shadow-lg"
      >
        <h1 className="text-4xl font-bold">Login</h1>
        <input
          name="username"
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="submit"
          value="Login"
          className="cursor-pointer w-[50%] mx-auto font-semibold bg-blue-500 hover:bg-blue-600 text-white p-2 rounded duration-150 shadow-md"
        />
        <p className="text-sm">
          Dont have an Account?{" "}
          <a href="/" className="text-blue-300 hover:underline">
            SignUp
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login
