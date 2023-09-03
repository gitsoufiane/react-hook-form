import { YoutubeForm } from "./components/YoutubeForm";
import { MuiLoginForm } from "./components/MuiLoginForm";
function App() {
  return (
    <main>
      <MuiLoginForm />
      <div className="bg-black h-10 w-full my-10" />
      <YoutubeForm />
    </main>
  );
}

export default App;
