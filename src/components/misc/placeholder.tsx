export function NoImagePlaceholder() {
  return (
    <div className="bg-background-accent grid size-full place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        className="text-foreground"
      >
        <path
          d="M45.9167 7.25H12.0833C9.41396 7.25 7.25 9.41396 7.25 12.0833V45.9167C7.25 48.586 9.41396 50.75 12.0833 50.75H45.9167C48.586 50.75 50.75 48.586 50.75 45.9167V12.0833C50.75 9.41396 48.586 7.25 45.9167 7.25Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5417 24.167C22.5437 24.167 24.1667 22.544 24.1667 20.542C24.1667 18.54 22.5437 16.917 20.5417 16.917C18.5396 16.917 16.9167 18.54 16.9167 20.542C16.9167 22.544 18.5396 24.167 20.5417 24.167Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50.75 36.2503L38.6666 24.167L12.0833 50.7503"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function NoVideoPlaceHolder() {
  return (
    <div className="bg-background grid size-full place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="size-[58px] text-foreground"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          stroke="currentColor"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
        />
      </svg>
    </div>
  );
}
