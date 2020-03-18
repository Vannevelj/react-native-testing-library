// @flow
import * as React from 'react';
import {
  getByTestId,
  getByType,
  getByText,
  getByPlaceholder,
  getByDisplayValue,
  getByProps,
  getAllByTestId,
  getAllByType,
  getAllByText,
  getAllByPlaceholder,
  getAllByDisplayValue,
  getAllByProps,
} from './getByAPI';
import { createQueryByError, printUnsafeWarning } from './errors';

export const queryByType = (instance: ReactTestInstance, warnFn?: Function) =>
  function queryByTypeFn(type: React.ComponentType<any>) {
    warnFn && warnFn('queryByType');
    try {
      return getByType(instance)(type);
    } catch (error) {
      return createQueryByError(error, queryByTypeFn);
    }
  };

export const queryByText = (instance: ReactTestInstance) =>
  function queryByTextFn(text: string | RegExp) {
    try {
      return getByText(instance)(text);
    } catch (error) {
      return createQueryByError(error, queryByTextFn);
    }
  };

export const queryByPlaceholder = (instance: ReactTestInstance) =>
  function queryByPlaceholderFn(placeholder: string | RegExp) {
    try {
      return getByPlaceholder(instance)(placeholder);
    } catch (error) {
      return createQueryByError(error, queryByPlaceholderFn);
    }
  };

export const queryByDisplayValue = (instance: ReactTestInstance) =>
  function queryByDisplayValueFn(value: string | RegExp) {
    try {
      return getByDisplayValue(instance)(value);
    } catch (error) {
      return createQueryByError(error, queryByDisplayValueFn);
    }
  };

export const queryByProps = (instance: ReactTestInstance, warnFn?: Function) =>
  function queryByPropsFn(props: { [propName: string]: any }) {
    warnFn && warnFn('queryByProps');
    try {
      return getByProps(instance)(props);
    } catch (error) {
      return createQueryByError(error, queryByPropsFn);
    }
  };

export const queryByTestId = (instance: ReactTestInstance) =>
  function queryByTestIdFn(testID: string) {
    try {
      return getByTestId(instance)(testID);
    } catch (error) {
      return createQueryByError(error, queryByTestIdFn);
    }
  };

export const queryAllByType = (
  instance: ReactTestInstance,
  warnFn?: Function
) => (type: React.ComponentType<any>) => {
  warnFn && warnFn('queryAllByType');
  try {
    return getAllByType(instance)(type);
  } catch (error) {
    return [];
  }
};

export const queryAllByText = (instance: ReactTestInstance) => (
  text: string | RegExp
) => {
  try {
    return getAllByText(instance)(text);
  } catch (error) {
    return [];
  }
};

export const queryAllByPlaceholder = (instance: ReactTestInstance) => (
  placeholder: string | RegExp
) => {
  try {
    return getAllByPlaceholder(instance)(placeholder);
  } catch (error) {
    return [];
  }
};

export const queryAllByDisplayValue = (instance: ReactTestInstance) => (
  value: string | RegExp
) => {
  try {
    return getAllByDisplayValue(instance)(value);
  } catch (error) {
    return [];
  }
};

export const queryAllByProps = (
  instance: ReactTestInstance,
  warnFn?: Function
) => (props: { [propName: string]: any }) => {
  warnFn && warnFn('queryAllByProps');
  try {
    return getAllByProps(instance)(props);
  } catch (error) {
    return [];
  }
};

export const queryAllByTestId = (instance: ReactTestInstance) => (
  testID: string
) => {
  try {
    return getAllByTestId(instance)(testID);
  } catch (error) {
    return [];
  }
};

export const queryByAPI = (instance: ReactTestInstance) => ({
  queryByTestId: queryByTestId(instance),
  queryByText: queryByText(instance),
  queryByPlaceholder: queryByPlaceholder(instance),
  queryByDisplayValue: queryByDisplayValue(instance),
  queryAllByTestId: queryAllByTestId(instance),
  queryAllByText: queryAllByText(instance),
  queryAllByPlaceholder: queryAllByPlaceholder(instance),
  queryAllByDisplayValue: queryAllByDisplayValue(instance),

  // Unsafe aliases
  UNSAFE_queryByType: queryByType(instance, printUnsafeWarning),
  UNSAFE_queryAllByType: queryAllByType(instance, printUnsafeWarning),
  UNSAFE_queryByProps: queryByProps(instance, printUnsafeWarning),
  UNSAFE_queryAllByProps: queryAllByProps(instance, printUnsafeWarning),
});
