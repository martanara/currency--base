import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';


describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from={'PLN'} to={'USD'} amount={100} />)
  });

  const testCasesAmount = [
    { amount: 100 },
    { amount: 20 },
    { amount: 200 },
    { amount: 345 }
  ];

  for(const testObj of testCasesAmount) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'PLN');
      const convertedAmount = formatAmountInCurrency((testObj.amount / 3.5), 'USD');
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formattedAmount} = ${convertedAmount}`);
    });
  }
  for(const testObj of testCasesAmount) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'USD');
      const convertedAmount = formatAmountInCurrency((testObj.amount * 3.5), 'PLN');
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formattedAmount} = ${convertedAmount}`);
    });
  }

  const testCasesCurrencies = [
    { currency: 'USD', amount: 100 },
    { currency: 'PLN', amount: 100 },
    { currency: 'USD', amount: 15 },
    { currency: 'PLN', amount: 345 },
  ];

  for(const testObj of testCasesCurrencies) {
    it('should render proper amount if the same currency was chosen', () => {
      render(<ResultBox from={testObj.currency} to={testObj.currency} amount={testObj.amount} />);
      const formattedAmount = formatAmountInCurrency(testObj.amount, testObj.currency);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formattedAmount} = ${formattedAmount}`);
    });
  }

  const testNegativeValues = [
    { from: 'USD', to: 'PLN', amount: -100 },
    { from: 'PLN', to: 'USD', amount: -5 },
    { from: 'USD', to: 'USD', amount: -1 },
    { from: 'PLN', to: 'PLN', amount: -4.5 },
  ];

  for(const testObj of testNegativeValues){
    it('should return “Wrong value…” if the amount is negative', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value…');
    });
  }
});