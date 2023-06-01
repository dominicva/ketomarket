import SignupCta from './SignupCta';

export default function Hero({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="bg-off-white px-4 py-6">
      <hgroup className="mb-6">
        <h2 className="mb-6 text-3xl font-bold">
          Order keto groceries for delivery
        </h2>
        <p>
          Follow a ketogenic diet with ease. Only the highest quality produce.
        </p>
      </hgroup>
      {!isLoggedIn ? <SignupCta /> : null}
    </section>
  );
}
