# Register Page

- Dashboard

  - ?Logo
  - Website title
  - NavBar
    - Menu items
      - Home
      - Login
      - Register
  - Page title

- Form

  - Inputs
    - email
    - userName
    - password
    - passwordConfirmation
  - error output
  - Submit button
  - Footer

- Form Submit

  - validate that all values are there
  - send post request api/register

    - if successful
      - show success message
      - redirect to home page and reload page by including jwt token in request
    - else
      - show error message
      - wait to retry

  - // handle user submit
  - // httponly cookie for storing jwt token
    - // logout user if jwt token fails

// styled components of form

- Making a api request

```js
const App = () => {
  useEffect(() => {
    const checkHealth = async () => {
      let response = await fetch("/api/checkhealth");
      console.log(response);
    };

    checkHealth();
  }, []);
  return <div>Hello World</div>;
};
```

1. Make the Dashboard
