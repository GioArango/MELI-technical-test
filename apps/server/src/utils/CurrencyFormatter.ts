/**
 * Formatea un valor numérico como una cantidad de moneda con el símbolo y la cantidad de decimales especificados.
 * 
 * @param value El valor numérico a formatear.
 * @param decimals Cantidad de decimales que tendrá el valor formateado.
 * @param symbol El símbolo de la moneda (por ejemplo, "$").
 * @returns La cadena formateada como cantidad de moneda.
 */
export const formatCurrency = (
    value: number,
    decimals: number,
    symbol?: string,
): string => {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    };

    if (symbol) {
        options.style = "currency";
        options.currency = symbol;
    } else {
        options.style = "decimal";
    }

    const formatter = new Intl.NumberFormat("es-AR", options);

    return formatter.format(value);
};