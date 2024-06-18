export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center mt-3 w-full text-sm">
        <p>hecho por </p>
        <a href="https://github.com/Thefederico" target="_blank">
          Thefederico
        </a>
        <p>&copy; {new Date().getFullYear()}</p>
        <p> | </p>
        <a href="https://www.netlify.com/" target="_blank">
          Powered by Netlify
        </a>
      </div>
    </footer>
  );
}
