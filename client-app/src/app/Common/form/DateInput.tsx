import React from 'react'
import {FieldRenderProps} from 'react-final-form'
import { DateTimePicker } from 'react-widgets'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'


interface IProps extends FieldRenderProps<Date,HTMLElement>, FormFieldProps{}

export const DateInput:React.FC<IProps> = ({input,date=false,time=false,width,placeholder,meta:{touched,error}}) => {
     type msg={
        dateButton?: string,
        timeButton?: string
      };
    var msgs: msg={ };

    return (
      
        <Form.Field  error={touched && !!error} width={width} >
            <DateTimePicker 
             value={input.value || null}
             placeholder={placeholder}
             onChange={input.onChange}
             onBlur={input.onBlur}
             onKeyDown={(e)=>e.preventDefault()}
             messages ={msgs}
             date={date}
             time={time}
            // {...rest} 

            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )

            }
        </Form.Field>
    )
}

export default DateInput