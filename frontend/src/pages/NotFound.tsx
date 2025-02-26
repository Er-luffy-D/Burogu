export const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-green-500 font-mono p-4 rounded-lg shadow-lg border border-green-500">
        <p>404: Page Not Found</p>
        <p>The page you are looking for does not exist.</p>
        <p>Please check the URL or return to the homepage.</p>
      </div>
    </div>
  );
};
