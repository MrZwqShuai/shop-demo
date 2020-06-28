/**
 * 转换为纯属组
 * @param nodes html node list
 */
export const convertListToArray = nodes => {
  let array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0);
  } catch (ex) {
    array = new Array();
    for (let i = 0, len = nodes.length; i < len; i++) {
      array.push(nodes[i]);
    }
  }

  return array;
};
