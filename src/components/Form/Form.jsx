import React from 'react';

const Form = ({title, name, pattern, register, errors, type}) => {
    return (
        <div>
            <label>{title}</label>
            <input
                {...register(name, {
                    required: 'Обязательное поле',
                    pattern
                })}
                type={type || "text"}
                placeholder={title}
            />
            <div className={styles.errorMessage}>
                {errors?.[name] && (
                    <p>{errors?.[name]?.message}</p>
                )}
            </div>
        </div>
    );
};

export default Form;