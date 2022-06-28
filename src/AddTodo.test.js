import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  // const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  // expect(checkDate).toBeInTheDocument();
 });


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // first entry
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  // second attempt (shouldn't add to list)
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);

  const check = screen.getAllByText(/History Test/i);
  // there should only be one in the list of occurrences
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // first entry (blank title, should not add to list)
  // fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);

  // const check = screen.getAllByText(new RegExp("05/30/2023", "i"));
  const check = screen.getAllByText(/You have no todo's left/i);
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // first entry (blank date, should not add to list)
  fireEvent.change(inputTask, { target: { value: "Get groceries"}});
  // fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(element);

  const check = screen.getAllByText(/You have no todo's left/i);
  expect(check.length).toBe(1);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // entry
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);

  const checkbox = screen.getByRole('checkbox');

  // deletion
  fireEvent.click(checkbox);

  const check = screen.getAllByText(/You have no todo's left/i);
  expect(check.length).toBe(1);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  // future date entry
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);

  const checkbox = screen.getByRole('checkbox');
  // const check = screen.getAllByText(/History Test/i);
  // expect(check[0]).toBe("white");

  fireEvent.click(checkbox);

  // past date entry
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2022"}});
  fireEvent.click(element);

  const check = screen.getAllByText(/History Test/i);
  expect(check[0].style).not.toBe("white");

  // deletion
  fireEvent.click(checkbox);

 });
