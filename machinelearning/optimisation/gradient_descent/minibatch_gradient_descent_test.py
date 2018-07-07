#testing gradient_descent.py
import minibatch_gradient_descent
import numpy as np
import time

number_of_points = 10000
number_of_variables = 1
tolerance = 10**-5

def function(x):
    return 5 * x[1] - 550

X = [np.random.random() for _ in range(number_of_points * number_of_variables + 1)]
bias = np.ones(shape=(number_of_points, number_of_variables + 1))
X = np.array(X)
X = np.resize(X, new_shape=(number_of_points, number_of_variables))
bias[:, 1:] = X
X = bias
y = []
for x in X:
    y.append(function(x))
y = np.array(y)
y = np.resize(y, new_shape=(number_of_points, 1))

gd = minibatch_gradient_descent.MiniBatchOptimizer(learning_rate=0.5,tolerance=10**-5, X=X, y=y, batch_size = 1000)

t0 = time.time()
print(gd.optimize())
t1 = time.time()

print("time taken by the optimiser : ", t1 - t0)

