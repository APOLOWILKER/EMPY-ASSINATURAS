export function PlanFeature({ feature }: { feature: string }) {
  return (
    <li className="flex items-start">
      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-gray-700">{feature}</span>
    </li>
  );
}