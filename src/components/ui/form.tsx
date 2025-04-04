// https://github.com/mrzachnugent/react-native-reusables/blob/353ee5e45dc2cd04b078e5d83c584c34fbc65e0e/packages/reusables/src/components/ui/form.tsx

import * as React from 'react';
import { View } from 'react-native';

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  Noop,
  useFormContext,
} from 'react-hook-form';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { type Option, Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { Text } from './text';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { formState, handleSubmit, getFieldState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { nativeID } = itemContext;

  return {
    name: fieldContext.name,
    formDescriptionNativeID: `${nativeID}-form-item-description`,
    formItemNativeID: `${nativeID}-form-item`,
    formMessageNativeID: `${nativeID}-form-item-message`,
    handleSubmit,
    nativeID,
    ...fieldState,
  };
};

type FormItemContextValue = {
  nativeID: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<React.ElementRef<typeof View>, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => {
    const nativeID = React.useId();

    return (
      <FormItemContext.Provider value={{ nativeID }}>
        <View ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  Omit<React.ComponentPropsWithoutRef<typeof Label>, 'children'> & {
    children: string;
  }
>(({ className, nativeID: _nativeID, ...props }, ref) => {
  const { error, formItemNativeID } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn('pb-1 native:pb-2 px-px', error && 'text-destructive', className)}
      nativeID={formItemNativeID}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormDescription = React.forwardRef<React.ElementRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionNativeID } = useFormField();

    return (
      <Text
        ref={ref}
        className={cn('text-sm text-muted-foreground pt-1', className)}
        nativeID={formDescriptionNativeID}
        {...props}
      />
    );
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Animated.Text>,
  React.ComponentPropsWithoutRef<typeof Animated.Text>
>(({ children, className, ...props }, ref) => {
  const { error, formMessageNativeID } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Animated.Text
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      nativeID={formMessageNativeID}
      {...props}
    >
      {body}
    </Animated.Text>
  );
});
FormMessage.displayName = 'FormMessage';

interface FormFieldFieldProps<T> {
  disabled?: boolean;
  name: string;
  onBlur: Noop;
  onChange: (val: T) => void;
  value: T;
}

type FormItemProps<T extends React.ElementType<any>, U> = Override<
  React.ComponentPropsWithoutRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string;
  description?: string;
};

type Override<T, U> = Omit<T, keyof U> & U;

const FormInput = React.forwardRef<React.ElementRef<typeof Input>, FormItemProps<typeof Input, string>>(
  ({ label, description, onChange, ...props }, ref) => {
    const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);
    const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

    React.useImperativeHandle(ref, () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
    }, [inputRef.current]);

    function handleOnLabelPress() {
      if (!inputRef.current) {
        return;
      }
      if (inputRef.current.isFocused()) {
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    }

    return (
      <FormItem>
        {!!label && (
          <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}

        <Input
          ref={inputRef}
          aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
          aria-invalid={!!error}
          aria-labelledby={formItemNativeID}
          onChangeText={onChange}
          {...props}
        />
        {!!description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  },
);

FormInput.displayName = 'FormInput';

const FormTextarea = React.forwardRef<React.ElementRef<typeof Textarea>, FormItemProps<typeof Textarea, string>>(
  ({ label, description, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<React.ComponentRef<typeof Textarea>>(null);
    const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

    React.useImperativeHandle(ref, () => {
      if (!textareaRef.current) {
        return {} as React.ComponentRef<typeof Textarea>;
      }
      return textareaRef.current;
    }, [textareaRef.current]);

    function handleOnLabelPress() {
      if (!textareaRef.current) {
        return;
      }
      if (textareaRef.current.isFocused()) {
        textareaRef.current?.blur();
      } else {
        textareaRef.current?.focus();
      }
    }

    return (
      <FormItem>
        {!!label && (
          <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}

        <Textarea
          ref={textareaRef}
          aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
          aria-invalid={!!error}
          aria-labelledby={formItemNativeID}
          onChangeText={onChange}
          {...props}
        />
        {!!description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  Omit<FormItemProps<typeof Checkbox, boolean>, 'checked' | 'onCheckedChange'>
>(({ label, description, value, onChange, ...props }, ref) => {
  const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className="px-1">
      <View className="flex-row gap-3 items-center">
        <Checkbox
          ref={ref}
          aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
          aria-invalid={!!error}
          aria-labelledby={formItemNativeID}
          checked={value}
          onCheckedChange={onChange}
          {...props}
        />
        {!!label && (
          <FormLabel className="pb-0" nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

const FormRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  Omit<FormItemProps<typeof RadioGroup, string>, 'onValueChange'>
>(({ label, description, value, onChange, ...props }, ref) => {
  const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem className="gap-3">
      <View>
        {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
        {!!description && <FormDescription className="pt-0">{description}</FormDescription>}
      </View>
      <RadioGroup
        ref={ref}
        aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
        aria-invalid={!!error}
        aria-labelledby={formItemNativeID}
        value={value}
        onValueChange={onChange}
        {...props}
      />

      <FormMessage />
    </FormItem>
  );
});

FormRadioGroup.displayName = 'FormRadioGroup';

/**
 * @prop {children}
 * @example
 *  <SelectTrigger className='w-[250px]'>
      <SelectValue
        className='text-foreground text-sm native:text-lg'
        placeholder='Select a fruit'
      />
    </SelectTrigger>
    <SelectContent insets={contentInsets} className='w-[250px]'>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem label='Apple' value='apple'>
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
 */
const FormSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  Omit<FormItemProps<typeof Select, Partial<Option>>, 'onOpenChange' | 'onValueChange' | 'open'>
>(({ label, description, value, onChange, ...props }, ref) => {
  const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <Select
        ref={ref}
        aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
        aria-invalid={!!error}
        aria-labelledby={formItemNativeID}
        value={value ? { label: value?.label ?? '', value: value?.label ?? '' } : undefined}
        onValueChange={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormSelect.displayName = 'FormSelect';

const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  Omit<FormItemProps<typeof Switch, boolean>, 'checked' | 'onCheckedChange'>
>(({ label, description, value, onChange, ...props }, ref) => {
  const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null);
  const { error, formDescriptionNativeID, formItemNativeID, formMessageNativeID } = useFormField();

  React.useImperativeHandle(ref, () => {
    if (!switchRef.current) {
      return {} as React.ComponentRef<typeof Switch>;
    }
    return switchRef.current;
  }, [switchRef.current]);

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className="px-1">
      <View className="flex-row gap-3 items-center">
        <Switch
          ref={switchRef}
          aria-describedby={!error ? `${formDescriptionNativeID}` : `${formDescriptionNativeID} ${formMessageNativeID}`}
          aria-invalid={!!error}
          aria-labelledby={formItemNativeID}
          checked={value}
          onCheckedChange={onChange}
          {...props}
        />
        {!!label && (
          <FormLabel className="pb-0" nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormSwitch.displayName = 'FormSwitch';

export {
  Form,
  FormCheckbox,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
  useFormField,
};
